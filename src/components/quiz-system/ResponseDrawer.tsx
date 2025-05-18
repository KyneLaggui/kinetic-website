import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ResponseDrawer({ response, open, onOpenChange }) {
  const calculateScore = () => {
    let score = 0;
    response.answers.forEach((answer) => {
      if (answer.selected_answer === answer.correct_answer) {
        score++;
      }
    });
    return score;
  };

  const percentage = (
    ((calculateScore() / response.answers.length) *
    50) + 50
  ).toFixed(1);


  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="border-b">
          <DrawerTitle className="text-lg sm:text-xl">
            {response.name}'s Answers
          </DrawerTitle>
          <DrawerDescription>
            Score: {calculateScore()}/{response.answers.length} ({percentage}%)
          </DrawerDescription>
        </DrawerHeader>

        <ScrollArea className="h-[60vh] sm:h-[70vh]">
          <div className="p-4 sm:p-6 space-y-6">
            {response.answers.map((answer, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-sm sm:text-base font-medium flex items-start gap-2">
                  <span
                    className={`w-6 h-6 flex items-center justify-center rounded-full text-white ${
                      answer.selected_answer === answer.correct_answer
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {index + 1}
                  </span>
                  {answer.question}
                </h3>

                <div className="grid gap-2">
                  {answer.choices.map((choice, cIndex) => (
                    <div
                      key={cIndex}
                      className={`p-3 sm:p-4 rounded-lg border ${
                        choice === answer.selected_answer
                          ? choice === answer.correct_answer
                            ? "bg-green-100 border-green-500"
                            : "bg-red-100 border-red-500"
                          : choice === answer.correct_answer
                          ? "border-green-500 bg-green-100"
                          : "border-gray-300"
                      }`}
                    >
                      {choice}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <DrawerFooter className="border-t">
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
