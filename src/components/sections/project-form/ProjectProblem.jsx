import Textarea from "../../Admin/Textarea";
import FileInput from "../../Admin/FileInput"

export default function ProjectProblem({
  formData,
  setFormData,
  handleChange,
}
){
    return(
        <section className="flex flex-col w-full p-12 bg-white gap-6 rounded-3xl">
            <h3 className="text-h3 text-black">Project Problem</h3>

            <div className="flex w-full gap-6">
                <Textarea id="problem" name="problem" label="Project Problem" placeholder="Enter Project Problem " value={formData.problem} onChange={handleChange} required/>

                <Textarea id="solution" name="solution" label="Project Solution" placeholder="Enter Project Problem" value={formData.solution} onChange={handleChange} required/>

                <div className="flex flex-col w-full gap-6">
                    <FileInput id="image1" label="Image 1" required accept="image/*" onChange={(e) => setFormData({ ...formData, image1: e.target.files[0],})}/>
                    <FileInput id="image2" label="Image 2" required accept="image/*" onChange={(e) => setFormData({ ...formData, image2: e.target.files[0],})}/>
                </div>
            </div>
        </section>
    );
}