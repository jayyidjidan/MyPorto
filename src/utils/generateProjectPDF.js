import { jsPDF } from "jspdf";

/**
 * Generates a clean, well-structured PDF document for a project.
 *
 * Layout:
 *   - Title page with project name, categories, duration
 *   - Overview section
 *   - Problem & Solution section
 *   - Processes section (numbered steps)
 *   - Technologies section
 *   - Results section
 *   - Links (source/preview URLs)
 */
export function generateProjectPDF(project) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // ── Color palette ─────────────────────────────────────────
  const colors = {
    black: [30, 30, 30],
    darkGray: [80, 80, 80],
    medGray: [140, 140, 140],
    lightGray: [220, 220, 220],
    accent: [45, 45, 45],
    white: [255, 255, 255],
  };

  // ── Helper: check if we need a new page ──────────────────
  const ensureSpace = (needed) => {
    if (y + needed > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  // ── Helper: draw a section heading ───────────────────────
  const drawHeading = (text) => {
    ensureSpace(20);
    y += 8;

    // Accent line
    doc.setDrawColor(...colors.accent);
    doc.setLineWidth(0.8);
    doc.line(margin, y, margin + 30, y);
    y += 6;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(...colors.black);
    doc.text(text, margin, y);
    y += 10;
  };

  // ── Helper: draw body text (with auto word-wrap) ─────────
  const drawBody = (text, indent = 0) => {
    if (!text) return;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...colors.darkGray);

    const lines = doc.splitTextToSize(text, contentWidth - indent);
    for (const line of lines) {
      ensureSpace(6);
      doc.text(line, margin + indent, y);
      y += 5.5;
    }
    y += 2;
  };

  // ── Helper: draw a label-value pair ──────────────────────
  const drawLabel = (label, value) => {
    if (!value) return;
    ensureSpace(12);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...colors.medGray);
    doc.text(label.toUpperCase(), margin, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(...colors.black);
    const lines = doc.splitTextToSize(String(value), contentWidth);
    for (const line of lines) {
      ensureSpace(6);
      doc.text(line, margin, y);
      y += 5.5;
    }
    y += 3;
  };

  // ── Helper: draw a thin divider ──────────────────────────
  const drawDivider = () => {
    ensureSpace(8);
    y += 4;
    doc.setDrawColor(...colors.lightGray);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);
    y += 4;
  };

  // ════════════════════════════════════════════════════════════
  // 1. TITLE PAGE
  // ════════════════════════════════════════════════════════════

  // Dark header block
  const headerH = 70;
  doc.setFillColor(...colors.accent);
  doc.rect(0, 0, pageWidth, headerH, "F");

  // Project title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(...colors.white);
  const titleLines = doc.splitTextToSize(project.hero?.title || "Untitled Project", pageWidth - margin * 2);
  let titleY = 30;
  for (const line of titleLines) {
    doc.text(line, margin, titleY);
    titleY += 12;
  }

  // Subtitle info
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(200, 200, 200);
  const categories = project.overview?.categories || [];
  if (categories.length > 0) {
    doc.text(categories.join("  •  "), margin, titleY + 2);
  }

  // Duration pill
  if (project.overview?.duration) {
    doc.setFontSize(9);
    doc.text(`Duration: ${project.overview.duration}`, margin, titleY + 10);
  }

  y = headerH + 15;

  // ════════════════════════════════════════════════════════════
  // 2. OVERVIEW
  // ════════════════════════════════════════════════════════════
  if (project.overview?.description) {
    drawHeading("Overview");
    drawBody(project.overview.description);
  }

  // ════════════════════════════════════════════════════════════
  // 3. PROBLEM & SOLUTION
  // ════════════════════════════════════════════════════════════
  if (project.problem?.problem || project.problem?.solution) {
    drawDivider();
    drawHeading("Problem & Solution");

    if (project.problem.problem) {
      drawLabel("Problem", project.problem.problem);
    }
    if (project.problem.solution) {
      drawLabel("Solution", project.problem.solution);
    }
  }

  // ════════════════════════════════════════════════════════════
  // 4. PROCESSES
  // ════════════════════════════════════════════════════════════
  const processes = project.processes || [];
  if (processes.length > 0) {
    drawDivider();
    drawHeading("Process");

    processes.forEach((p, i) => {
      ensureSpace(16);

      // Step number circle
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(...colors.accent);
      doc.text(`${i + 1}.`, margin, y);

      // Step title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(...colors.black);
      doc.text(p.title || "", margin + 8, y);
      y += 6;

      // Step description
      if (p.description) {
        drawBody(p.description, 8);
      }
      y += 2;
    });
  }

  // ════════════════════════════════════════════════════════════
  // 5. TECHNOLOGIES
  // ════════════════════════════════════════════════════════════
  const technologies = project.technologies || [];
  if (technologies.length > 0) {
    drawDivider();
    drawHeading("Technologies");

    // Render as pill-style list
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...colors.darkGray);

    let pillX = margin;
    const pillH = 8;
    const pillPadding = 6;

    for (const tech of technologies) {
      const textW = doc.getTextWidth(tech.name) + pillPadding * 2;

      // Wrap to next line if overflow
      if (pillX + textW > pageWidth - margin) {
        pillX = margin;
        y += pillH + 4;
        ensureSpace(pillH + 4);
      }

      // Draw pill background
      doc.setFillColor(...colors.lightGray);
      doc.roundedRect(pillX, y - 5, textW, pillH, 3, 3, "F");

      // Draw pill text
      doc.setTextColor(...colors.accent);
      doc.text(tech.name, pillX + pillPadding, y);

      pillX += textW + 4;
    }
    y += pillH + 6;
  }

  // ════════════════════════════════════════════════════════════
  // 6. RESULTS
  // ════════════════════════════════════════════════════════════
  const results = project.results || [];
  if (results.length > 0) {
    drawDivider();
    drawHeading("Results");

    results.forEach((r, i) => {
      ensureSpace(16);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(...colors.black);
      doc.text(`${r.title || `Result ${i + 1}`}`, margin, y);
      y += 6;

      if (r.description) {
        drawBody(r.description, 0);
      }
      y += 2;
    });
  }

  // ════════════════════════════════════════════════════════════
  // 7. LINKS
  // ════════════════════════════════════════════════════════════
  const hasLinks =
    (project.hero?.showSource && project.hero?.sourceUrl) ||
    (project.hero?.showPreview && project.hero?.previewUrl);

  if (hasLinks) {
    drawDivider();
    drawHeading("Links");

    if (project.hero.showSource && project.hero.sourceUrl) {
      ensureSpace(8);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(...colors.medGray);
      doc.text("SOURCE", margin, y);
      y += 5;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(0, 90, 180);
      doc.textWithLink(project.hero.sourceUrl, margin, y, {
        url: project.hero.sourceUrl,
      });
      y += 8;
    }

    if (project.hero.showPreview && project.hero.previewUrl) {
      ensureSpace(8);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(...colors.medGray);
      doc.text("PREVIEW", margin, y);
      y += 5;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(0, 90, 180);
      doc.textWithLink(project.hero.previewUrl, margin, y, {
        url: project.hero.previewUrl,
      });
      y += 8;
    }
  }

  // ════════════════════════════════════════════════════════════
  // 8. FOOTER on every page
  // ════════════════════════════════════════════════════════════
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...colors.medGray);

    const dateStr = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    doc.text(
      `${project.hero?.title || "Project"} — Page ${i} of ${totalPages}`,
      margin,
      pageHeight - 10
    );
    doc.text(
      `Generated ${dateStr}`,
      pageWidth - margin,
      pageHeight - 10,
      { align: "right" }
    );
  }

  // ── Save ──────────────────────────────────────────────────
  const filename = `${project.slug || "project"}-case-study.pdf`;
  doc.save(filename);
}
