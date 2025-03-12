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

// FormField Component
function FormField({ label, id, placeholder, required, children }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor={id} className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {children || (
        <Input id={id} placeholder={placeholder} required={required} />
      )}
    </div>
  );
}

// Register Component
export function Register() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Register</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Register Student</DialogTitle>
          <DialogDescription>
            Register a new student to the system.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[400px] sm:max-h-none">
          <div className="grid gap-4 py-4">
            {/* First Name & Middle Name */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
              <FormField
                label="First Name"
                id="first_name"
                placeholder="Juan"
                required
              />
              <FormField
                label="Middle Name"
                id="middle_name"
                placeholder="Navarro"
              />
            </div>
            {/* Last Name & Suffix */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
              <FormField
                label="Last Name"
                id="last_name"
                placeholder="Dela Cruz"
                required
              />
              <FormField label="Suffix" id="suffix" placeholder="Jr." />
            </div>
            {/* Student ID */}
            <FormField
              label="Student ID"
              id="student_id"
              placeholder="202X-XXXXX-MN-0"
              required
            />
            {/* Year & Section */}
            <FormField label="Section" id="section" required>
              <div className="flex flex-row gap-2">
                <Select>
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
                <Input id="section" placeholder="3" required />
              </div>
            </FormField>
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button type="submit">Register</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
