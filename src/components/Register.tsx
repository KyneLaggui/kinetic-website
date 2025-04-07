import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import useUser from "@/supabase/custom-hooks/useUser";
import { userSchema } from "@validation";
import { showNotification } from "@utils";

// FormField Component
function FormField({ label, id, placeholder, required, value, onChange, children }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor={id}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {children || (
        <Input id={id} placeholder={placeholder} required={required} value={value} onChange={onChange} />
      )}
    </div>
  );
}

// Register Component
export function Register() {
  const { createUser } = useUser(); // Use the custom hook
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    suffix: "",
    student_id: "",
    year: "",
    section: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data with Zod
    const validation = userSchema.safeParse(formData);

    if (!validation.success) {
      // Extract errors from ZodError
      const formattedErrors = validation.error.errors
        .map(err => `• ${err.message}`) // Add bullet points
        .join('\n'); // Join with line breaks for readability
    
      showNotification('error', formattedErrors);
    
      return;
    }
    
    // Call Supabase or API to submit the data
    try {
      const isSuccessful = await createUser(formData);

      if (isSuccessful) {
        setFormData({
          first_name: "",
          middle_name: "",
          last_name: "",
          suffix: "",
          student_id: "",
          year: "",
          section: "",
        });
      } 
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Register</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Register Student</DialogTitle>
          <DialogDescription>Register a new student to the system.</DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[400px] sm:max-h-none">
          <form onSubmit={handleSubmit} className="grid gap-4 sm:p-2">
            {/* First Name & Middle Name */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
              <FormField
                label="First Name"
                id="first_name"
                placeholder="Juan"
                required
                value={formData.first_name}
                onChange={handleChange}
              />
              <FormField
                label="Middle Name"
                id="middle_name"
                placeholder="Navarro"
                value={formData.middle_name}
                onChange={handleChange}
              />
            </div>
            {/* Last Name & Suffix */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
              <FormField
                label="Last Name"
                id="last_name"
                placeholder="Dela Cruz"
                required
                value={formData.last_name}
                onChange={handleChange}
              />
              <FormField
                label="Suffix"
                id="suffix"
                placeholder="Jr."
                value={formData.suffix}
                onChange={handleChange}
              />
            </div>
            {/* Student ID */}
            <FormField
              label="Student ID"
              id="student_id"
              placeholder="202X-XXXXX-MN-0"
              required
              value={formData.student_id}
              onChange={handleChange}
            />
            {/* Year & Section */}
            <FormField label="Section" id="section" required>
              <div className="flex flex-row gap-2">
                <Select onValueChange={(value) => setFormData({ ...formData, year: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Year</SelectLabel>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Input id="section" placeholder="3" required value={formData.section} onChange={handleChange} />
              </div>
            </FormField>

            <DialogFooter>
              <Button type="submit">Register</Button>
            </DialogFooter>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
