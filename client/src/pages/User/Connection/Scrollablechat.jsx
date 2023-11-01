import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from '../../../config/ChatLogics';
import { useSelector } from 'react-redux';

const Scrollablechat = ({ messages }) => {
  const { user } = useSelector((state) => state.auth);
  //console.log(messages,"🔥🔥");
  return (
    <div className=" bg-slate-200">
      <ScrollableFeed>
        {messages &&
          messages.map((m, i) => (
            <div className="flex" key={m._id}>
              {(isSameSender(messages, m, i, user._id) ||
                isLastMessage(messages, i, user._id)) && (
                <div className="mt-7px mr-1">
                  <img
                    src={m.sender.displayPic[0]}
                    alt={m.sender.username}
                    className="w-8 h-8 rounded-full cursor-pointer"
                  />
                  <div className="text-cyan-600">
                    {/* {m.sender.username} */}
                    {/* <span className="tooltiptext">{m.sender.username}</span> */}
                  </div>
                </div>
              )}
          <span
                    className={`${
                      m.sender._id === user._id ? 'bg-blue-200' : 'bg-green-200'
                    } ml-${isSameSenderMargin(messages, m, i, user._id)} mt-${
                      isSameUser(messages, m, i, user._id) ? 3 : 10
                    } rounded-lg py-1 px-3 max-w-3/4 `}
                  >
                    {m.content}
                    <span className=" pl-3 text-[10px] text-gray-500 ">
                    {new Date(m.createdAt).toLocaleString([], {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </span>
                  </span>
            </div>
          ))}
      </ScrollableFeed>
    </div>
  );
};

export default Scrollablechat;
