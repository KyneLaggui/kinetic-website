import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

export function ResponseDrawer({ response, questions, open, onOpenChange }) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="border-b">
          <DrawerTitle>{response.name}'s Answers</DrawerTitle>
          <DrawerDescription>{response.studentId}</DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-[70vh]">
          <div className="p-6">
            <div className="space-y-6">
              {questions.map((question, index) => {
                const userAnswer = response.answers.find(
                  (answer) => answer.questionId === question.id
                );
                const isCorrect = userAnswer
                  ? question.choices.find(
                      (choice) => choice.id === userAnswer.choiceId
                    )?.isCorrect
                  : null;

                return (
                  <div key={question.id} className="space-y-4">
                    <h3 className="font-medium flex items-center gap-2">
                      <span
                        className={`w-6 h-6 flex items-center justify-center rounded-full text-white ${
                          userAnswer
                            ? isCorrect
                              ? "bg-green-500"
                              : "bg-red-500"
                            : "bg-gray-500"
                        }`}
                      >
                        {index + 1}
                      </span>
                      {question.text}
                    </h3>
                    <div className="grid gap-2">
                      {question.choices.map((choice) => {
                        const isSelected = response.answers.some(
                          (answer) =>
                            answer.questionId === question.id &&
                            answer.choiceId === choice.id
                        );
                        const isCorrectChoice = choice.isCorrect;
                        const bgColor = isSelected
                          ? isCorrectChoice
                            ? "bg-green-100 border-green-500"
                            : "bg-red-100 border-red-500"
                          : isCorrectChoice
                          ? "bg-green-100 border-green-500"
                          : "bg-white";

                        return (
                          <div
                            key={choice.id}
                            className={`p-4 rounded-lg border ${bgColor}`}
                          >
                            {choice.text}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollArea>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
