import { Input } from '@/components/ui/Input';
import { useCallback, useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { getShorthandContent, getShorthands } from '@/lib/utils';
import { Button } from './ui/Button';

type ShorthandCommandType = {
  shorthand: string;
  content: string;
};

export default function MessageInput() {
  const [messageContent, setMessageContent] = useState<string>('');
  const [shorthandCommands, setShorthandCommands] = useState<
    ShorthandCommandType[]
  >([]);
  const [shorthandCommandList, setShorthandCommandList] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    setShorthandCommands(getShorthands());
  });

  useEffect(() => {
    if (!messageContent) setShorthandCommandList(false);
  }, [messageContent]);

  const handleMessageContentChange = (inputEvent: any) => {
    let _messageContent = inputEvent?.target?.value;
    setMessageContent(_messageContent);

    if (_messageContent?.includes('/')) {
      setShorthandCommandList(true);
    }
  };

  const escFunction = useCallback((event: any) => {
    if (event.key === 'Escape') {
      setShorthandCommandList(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  const replacePostSlashWithShorthand = (shorthand: string) => {
    if (!shorthand) return;
    const shorthandContent = getShorthandContent(shorthand);
    if (!shorthandContent) return;
    setMessageContent((messageContent) => {
      const lastSlashIndex = messageContent.lastIndexOf('/');
      return messageContent.substring(0, lastSlashIndex) + shorthandContent;
    });
  };

  return (
    <section className="message-input-section my-4">
      <div className="messages-content-container my-4 grid h-[200px] overflow-y-scroll">
        {messages?.map((message: string, messageIndex: number) => (
          <div key={messageIndex}>
            <span className="text-xs font-medium text-gray-500">you</span>
            <div className="message-content-wrapper w-fit rounded bg-green-600 text-white font-medium text-sm px-4 py-2">
              {message}
            </div>
          </div>
        ))}
      </div>
      <h2 className="mb-2 leading-snug text-base font-medium text-gray-500 cursor-default select-none">
        Send Message
      </h2>
      <div className="relative">
        <div className="message-input-layer-wrapper absolute w-[680px] flex flex-row items-center justify-between gap-2">
          <Input
            placeholder="Type a message or use / to use shorthand commands"
            value={messageContent}
            onChange={handleMessageContentChange}
            onKeyDown={(keyEvent) => {
              if (keyEvent.code === 'Enter') {
                let _updatedMessageList: string[] = messages;
                _updatedMessageList.push(messageContent);
                setMessages(_updatedMessageList);
                setMessageContent('');
              }
            }}
          />
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={() => {
              let _updatedMessageList: string[] = messages;
              _updatedMessageList.push(messageContent);
              setMessages(_updatedMessageList);
              setMessageContent('');
            }}>
            Send
          </Button>
        </div>
        <ScrollArea
          className={`absolute top-12 w-[180px] h-fit min-h-[40px] overflow-y-scroll
                                max-h-[140px] rounded p-2 border border-gray-200 shadow-md
                                ${shorthandCommandList ? 'visible' : 'hidden'}
                `}>
          <ul className="shorthand-commands-list grid grid-cols-1 items-start justify-start">
            {shorthandCommands?.length > 0 ? (
              shorthandCommands?.map(
                (command: ShorthandCommandType, commandIndex) => (
                  <li
                    className="shorthand-command-item select-none"
                    key={commandIndex}>
                    <Button
                      className="shorthand-command-item-content-wrapper py-2 w-full
                                        flex flex-row items-center justify-start"
                      variant={'subtle'}
                      onClick={() => {
                        setShorthandCommandList(false);
                        replacePostSlashWithShorthand(command?.shorthand);
                      }}>
                      <h4 className="shorthand-text-wrapper font-medium text-sm text-gray-900">
                        {'/' + command?.shorthand}
                      </h4>
                    </Button>
                  </li>
                ),
              )
            ) : (
              <p className="cursor-default select-none text-xs text-gray-400 font-normal">
                No Shorthand Commands found
              </p>
            )}
          </ul>
        </ScrollArea>
      </div>
    </section>
  );
}
