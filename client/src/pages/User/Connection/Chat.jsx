import React, { useEffect, useState } from 'react';

import Lottie from 'lottie-react';
import animationData from '../../../animation/typing.json';
import { userInstance, setAccessToken } from '../../../utils/axiosApi';
import { useSelector } from 'react-redux';
import Scrollablechat from './Scrollablechat';
import io from 'socket.io-client';
const ENDPOINT = 'http://localhost:5000';
var socket, selectedChatCompare;

const Chat = ({ selectedUser, selectedChatId }) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const { token, user } = useSelector((state) => state.auth);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const fetchMessages = async () => {
    if (!selectedChatId) return;

    try {
      // const options = {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   };

      setLoading(true);
      // setAccessToken(token)
      const { data } = await userInstance.get(`/getmessage/${selectedChatId}`);
      // console.log(data,"💕💕");
      setMessages(data);
      setLoading(false);

      socket.emit('join chat', selectedChatId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChatId;
    // eslint-disable-next-line
  }, [selectedChatId]);

  console.log('====================================');
  console.log(selectedChatId);
  // console.log(selectedChat._id);
  console.log('====================================');

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('setup', user);
    socket.on('connected', () => setSocketConnected(true));
    socket.on('typing', () => setIsTyping(true));
    socket.on('stop typing', () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  const sendMessage = async (event) => {
    if (event.key === 'Enter' && newMessage) {
      socket.emit('stop typing', selectedChatId);
      try {
        // const options = {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   };

        const { data } = await userInstance.post(`/message`, {
          content: newMessage,
          chatId: selectedChatId,
          senderId: user._id,
        });

        setNewMessage('');

        socket.emit('new message', data);
        setMessages([...messages, data]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    socket.on('message recieved', (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      )
        // {
        //     if (!notification.includes(newMessageRecieved)) {
        //       setNotification([newMessageRecieved, ...notification]);
        //       setFetchAgain(!fetchAgain);
        //     }
        //   } else {
        //     setMessages([...messages, newMessageRecieved]);
        //   }
        setMessages([...messages, newMessageRecieved]);
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    console.log(newMessage);
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit('typing', selectedChatId);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit('stop typing', selectedChatId);
        setTyping(false);
      }
    }, timerLength);
  };
  return (
    <>
      <div className=" border-2 border-cyan-950">
        <div className="bg-slate-700 h-11 flex items-center justify-center  text-stone-50 text-lg ">
          {selectedUser}
        </div>

        <div className="h-144 bg-slate-200 flex flex-col overflow-y-auto scrollbar-none  ">
          <Scrollablechat messages={messages} />
        </div>

        <div className="flex flex-col justify-end">
          {istyping && (
            <div className="mb-3 ml-0">
              <Lottie
                options={defaultOptions}
                width={70}
                style={{ marginBottom: 15, marginLeft: 0 }}
              />
            </div>
          )}
          <input
            type="text"
            className="w-full h-10 bg-zinc-500"
            placeholder="Enter a message.."
            value={newMessage}
            onChange={typingHandler}
            onKeyDown={sendMessage}
          />
        </div>
      </div>
    </>
  );
};

export default Chat;
