import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';

import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { getShorthands, saveToLocalStorage } from '@/lib/utils';

type ShorthandCommandType = {
  shorthand: string;
  content: string;
};

export default function ShorthandManager() {
  const [shorthandCommands, setShorthandCommands] = useState<
    ShorthandCommandType[]
  >([]);
  const [shorthandInput, setShorthandInput] = useState<string>('');
  const [contentInput, setContentInput] = useState<string>('');

  useEffect(() => {
    setShorthandCommands(getShorthands());
  }, []);

  const handleShorthandInputChange = (inputEvent: any) => {
    // making a regex check for space in strings
    // replacing spaces with "-"
    const spaceRegex = /\s/g;
    const spaceReplace = '-';
    var updatedShorthand = inputEvent?.target?.value?.replace(
      spaceRegex,
      spaceReplace,
    );

    // updatedShorthand = inputEvent?.target?.value?.replace("/", "");

    setShorthandInput(updatedShorthand);
  };

  const handleContentInputChange = (inputEvent: any) => {
    setContentInput(inputEvent.target.value);
  };

  const handleShorthandUpdate = () => {
    // @ts-ignore
    setShorthandCommands(JSON.parse(localStorage.getItem('shorthands')));
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-start gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex flex-row items-center justify-center gap-2 bg-green-600 hover:bg-green-700">
              <Plus size={14} />
              Add new command
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="dialog-content-body my-2 grid grid-cols-1 gap-4">
              <div className="flex flex-col items-start justify-start gap-3">
                <Label htmlFor="shorthand-command">Shorthand Command</Label>
                <Input
                  id="shorthand-command"
                  placeholder="Enter a shorthand command"
                  onChange={handleShorthandInputChange}
                  value={shorthandInput}
                />
              </div>
              <div className="flex flex-col items-start justify-start gap-3">
                <Label htmlFor="shorthand-content">Content for Shorthand</Label>
                <Input
                  id="shorthand-content"
                  placeholder={`Enter content for ${
                    shorthandInput ? '/' + shorthandInput : 'shorthand'
                  }`}
                  onChange={handleContentInputChange}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="submit"
                  disabled={!shorthandInput || !contentInput}
                  onClick={() => {
                    saveToLocalStorage({
                      newShorthand: shorthandInput,
                      newContent: contentInput,
                    });
                    setShorthandInput('');
                    setContentInput('');
                    handleShorthandUpdate();
                  }}>
                  Save Shorthand
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button variant={'outline'}>Manage Shorthands</Button>
      </div>
      <div
        className="shorthand-commands-list-wrapper mt-4
                w-fit h-[140px] overflow-y-scroll pr-4 pb-2
            ">
        <ul className="shorthand-commands-list grid grid-cols-3 gap-2 items-start justify-start">
          {shorthandCommands?.length > 0 ? (
            shorthandCommands?.map(
              (command: ShorthandCommandType, commandIndex) => (
                <li
                  className="shorthand-command-item select-none"
                  key={commandIndex}>
                  <div
                    className="shorthand-command-item-content-wrapper rounded border bg-gray-50 border-gray-200 w-[200px] px-4 py-2 flex flex-col items-start
                                    hover:shadow
                                ">
                    <h4 className="shorthand-text-wrapper font-medium text-sm text-gray-900">
                      {'/' + command?.shorthand}
                    </h4>
                    <p className="shorthand-content-wrapper text-xs text-gray-600 w-[160px] truncate">
                      {command?.content}
                    </p>
                  </div>
                </li>
              ),
            )
          ) : (
            <p className="cursor-default select-none text-xs text-gray-400 font-normal">
              No Shorthand Commands found
            </p>
          )}
        </ul>
      </div>
    </div>
  );
}
