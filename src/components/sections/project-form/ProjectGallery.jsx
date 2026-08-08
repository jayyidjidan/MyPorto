import FileInput from "../../Admin/FileInput";

export default function ProjectGallery({
  formData,
  setFormData,
  handleChange,
}
){
    return(
        <section className="flex flex-col w-full p-12 bg-white gap-6 rounded-3xl">
            <h3 className="text-h3 text-black">Project Gallery</h3>
                <div className="flex w-full gap-6">
                    <FileInput id="gallery1" label="Image 1" required accept="image/*" onChange={(e) => setFormData({ ...formData, gallery1: e.target.files[0],})}/>
                    <FileInput id="gallery2" label="Image 2" required accept="image/*" onChange={(e) => setFormData({ ...formData, gallery2: e.target.files[0],})}/>
                    <FileInput id="gallery3" label="Image 3" required accept="image/*" onChange={(e) => setFormData({ ...formData, gallery3: e.target.files[0],})}/>
                </div>
                
                <div className="flex w-full gap-6">
                    <FileInput id="gallery4" label="Image 4" required accept="image/*" onChange={(e) => setFormData({ ...formData, gallery4: e.target.files[0],})}/>
                    <FileInput id="gallery5" label="Image 5" required accept="image/*" onChange={(e) => setFormData({ ...formData, gallery5: e.target.files[0],})}/>
                    <FileInput id="gallery6" label="Image 6" required accept="image/*" onChange={(e) => setFormData({ ...formData, gallery6: e.target.files[0],})}/>
                </div>
              
                <div className="flex w-full gap-6">
                    <FileInput id="gallery7" label="Image 7" required accept="image/*" onChange={(e) => setFormData({ ...formData, gallery7: e.target.files[0],})}/>
                    <FileInput id="gallery8" label="Image 8" required accept="image/*" onChange={(e) => setFormData({ ...formData, gallery8: e.target.files[0],})}/>
                    <FileInput id="gallery9" label="Image 9" required accept="image/*" onChange={(e) => setFormData({ ...formData, gallery9: e.target.files[0],})}/>
                </div>
        </section>
    );
}