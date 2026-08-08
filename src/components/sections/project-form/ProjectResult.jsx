import Input from "../../Admin/Input";
import Textarea from "../../Admin/Textarea";
import FileInput from "../../Admin/FileInput";

export default function ProjectResult({
  formData,
  setFormData,
  handleChange,
}
){
    return(
        <section className="flex flex-col w-full p-12 bg-white gap-6 rounded-3xl">
            <h3 className="text-h3 text-black">Project result</h3>
                {/* input */}
                <div className="flex w-full gap-6">
                    <Input id="result1" name="result1" label="result 1" placeholder="Enter Result 1" value={formData.result1} onChange={handleChange} required/>
                    <Input id="result2" name="result2" label="result 2" placeholder="Enter Result 2" value={formData.result2} onChange={handleChange} required/>
                    <Input id="result3" name="result3" label="result 3" placeholder="Enter Result 3" value={formData.result3} onChange={handleChange} required/>
                </div>

                {/* textarea */}
                <div className="flex w-full gap-6">
                    <Textarea id="result1description" name="result1description" label="Result 1 Desc" placeholder="Enter Project Description" value={formData.result1description} onChange={handleChange} required/>
                    <Textarea id="result2description" name="result2description" label="Result 2 Desc" placeholder="Enter Project Description" value={formData.result2description} onChange={handleChange} required/>
                    <Textarea id="result3description" name="result3description" label="Result 3 Desc" placeholder="Enter Project Description" value={formData.result3description} onChange={handleChange} required/>
                </div>

                {/* image */}
                <div className="flex w-full gap-6">
                    <FileInput id="result1image" label="Image 1" required accept="image/*" onChange={(e) => setFormData({ ...formData, result1image: e.target.files[0],})}/>
                    <FileInput id="result2image" label="Image 2" required accept="image/*" onChange={(e) => setFormData({ ...formData, result2image: e.target.files[0],})}/>
                    <FileInput id="result3image" label="Image 1" required accept="image/*" onChange={(e) => setFormData({ ...formData, result3image: e.target.files[0],})}/>
                </div>
        </section>
    );
}