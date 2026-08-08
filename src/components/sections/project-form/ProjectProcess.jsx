import Input from "../../Admin/Input";
import Textarea from "../../Admin/Textarea";
import FileInput from "../../Admin/FileInput";

export default function ProjectProcess({
  formData,
  setFormData,
  handleChange,
}
){
    return(
        <section className="flex flex-col w-full p-12 bg-white gap-6 rounded-3xl">
            <h3 className="text-h3 text-black">Project Process</h3>
                {/* input */}
                <div className="flex w-full gap-6">
                    <Input id="process1" name="process1" label="Process 1" placeholder="Enter Process 1" value={formData.process1} onChange={handleChange} required/>
                    <Input id="process2" name="process2" label="Process 2" placeholder="Enter Process 2" value={formData.process2} onChange={handleChange} required/>
                    <Input id="process3" name="process3" label="Process 3" placeholder="Enter Process 3" value={formData.process3} onChange={handleChange} required/>
                    <Input id="process4" name="process4" label="Process 4" placeholder="Enter Process 4" value={formData.process4} onChange={handleChange} required/>
                </div>

                {/* textarea */}
                <div className="flex w-full gap-6">
                    <Textarea id="process1description" name="process1description" label="Process 1 Desc" placeholder="Enter Project Description" value={formData.process1description} onChange={handleChange} required/>
                    <Textarea id="process2description" name="process2description" label="Process 2 Desc" placeholder="Enter Project Description" value={formData.process2description} onChange={handleChange} required/>
                    <Textarea id="process3description" name="process3description" label="Process 3 Desc" placeholder="Enter Project Description" value={formData.process3description} onChange={handleChange} required/>
                    <Textarea id="process4description" name="process4description" label="Process 4 Desc" placeholder="Enter Project Description" value={formData.process4description} onChange={handleChange} required/>
                </div>

                {/* image */}
                <div className="flex w-full gap-6">
                    <FileInput id="process1image" label="Image 1" required accept="image/*" onChange={(e) => setFormData({ ...formData, process1image: e.target.files[0],})}/>
                    <FileInput id="process2image" label="Image 2" required accept="image/*" onChange={(e) => setFormData({ ...formData, process2image: e.target.files[0],})}/>
                    <FileInput id="process3image" label="Image 1" required accept="image/*" onChange={(e) => setFormData({ ...formData, process3image: e.target.files[0],})}/>
                    <FileInput id="process4image" label="Image 1" required accept="image/*" onChange={(e) => setFormData({ ...formData, process4image: e.target.files[0],})}/>
                </div>
        </section>
    );
}