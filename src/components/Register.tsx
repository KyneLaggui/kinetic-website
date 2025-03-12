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
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-2 justify-between">
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="first_name">First Name</Label>
              <Input id="first_name" />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="middle_name">Middle Name</Label>
              <Input id="middle_name" />
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-2 justify-between">
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="last_Name">Last Name</Label>
              <Input id="last_name" />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="suffix">Suffix</Label>
              <Input id="suffix" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="student_id">Student ID</Label>
            <Input id="student_id" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="section">Section</Label>
            <div className="flex flex-row gap-2">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Year</SelectLabel>
                    <SelectItem value="apple">1</SelectItem>
                    <SelectItem value="banana">2</SelectItem>
                    <SelectItem value="blueberry">3</SelectItem>
                    <SelectItem value="grapes">4</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Input id="section" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Register</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
