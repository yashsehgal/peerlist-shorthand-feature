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
import {
  getShorthands,
  removeShorthand,
  saveToLocalStorage,
  updateShorthandData,
} from '@/lib/utils';

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
  const [manageShorthand, setManageShorthand] = useState(false);
  const [newShorthandData, setNewShorthandData] = useState<{
    shorthand: string;
    content: string;
  }>({
    shorthand: '',
    content: '',
  });

  useEffect(() => {
    setShorthandCommands(getShorthands());
  });

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

  const handleNewShorthandCommand = (inputEvent: any) => {
    setNewShorthandData({
      ...newShorthandData,
      shorthand: inputEvent?.target?.value,
    });
  };

  const handleNewShorthandContent = (inputEvent: any) => {
    setNewShorthandData({
      ...newShorthandData,
      content: inputEvent?.target?.value,
    });
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
              <DialogTitle>Create new Shorthand</DialogTitle>
              <DialogDescription>
                Please provide a shorthand keyword and content for it, to be
                able to use it in messages.
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
        <Button
          variant={'outline'}
          onClick={() => setManageShorthand(!manageShorthand)}>
          {manageShorthand ? 'Save all Changes' : 'Manage Shorthands'}
        </Button>
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
                    <div
                      className={`manage-shorthand-command-actions mt-3 
                                                      flex flex-row items-center justify-between gap-2 w-full
                                                      ${
                                                        manageShorthand
                                                          ? 'visible'
                                                          : 'hidden'
                                                      }
                                                      `}>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size={'sm'}
                            variant={'destructive'}
                            className={'w-full'}>
                            Remove
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Remove /{command?.shorthand}
                            </DialogTitle>

                            <DialogDescription>
                              Are you sure you want to remove /
                              {command?.content} shorthand command?
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant={'outline'}>Cancel</Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                onClick={() =>
                                  removeShorthand(command?.shorthand)
                                }>
                                Remove /{command?.shorthand}
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size={'sm'}
                            variant={'outline'}
                            className={'w-full'}
                            onClick={() => {
                              setNewShorthandData({
                                shorthand: shorthandInput,
                                content: contentInput,
                              });
                            }}>
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Edit /{command?.shorthand}
                            </DialogTitle>
                            <DialogDescription>
                              Edit shorthand command or content for{' '}
                              <span className="font-medium text-gray-900">
                                /{command?.shorthand}
                              </span>
                            </DialogDescription>
                          </DialogHeader>
                          <div className="dialog-content-body my-2 grid grid-cols-1 gap-4">
                            <div className="flex flex-col items-start justify-start gap-3">
                              <Label htmlFor="new-shorthand-command">
                                New Shorthand Command
                              </Label>
                              <Input
                                id="new-shorthand-command"
                                placeholder="Enter a shorthand command"
                                onChange={handleNewShorthandCommand}
                                defaultValue={command?.shorthand}
                              />
                            </div>
                            <div className="flex flex-col items-start justify-start gap-3">
                              <Label htmlFor="new-shorthand-content">
                                New Content for Shorthand
                              </Label>
                              <Input
                                id="new-shorthand-content"
                                placeholder={`Enter content for ${
                                  shorthandInput
                                    ? '/' + shorthandInput
                                    : 'shorthand'
                                }`}
                                onChange={handleNewShorthandContent}
                                defaultValue={command?.content}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <DialogClose>
                                <Button variant={'outline'}>Cancel</Button>
                              </DialogClose>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                onClick={() => {
                                  updateShorthandData({
                                    shorthand: command?.shorthand,

                                    newShorthand: newShorthandData?.shorthand,
                                    newContent: newShorthandData?.content,
                                  });
                                }}>
                                Save Changes
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
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
