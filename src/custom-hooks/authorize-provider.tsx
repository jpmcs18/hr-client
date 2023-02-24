import { Guid } from 'guid-typescript';
import React, { ReactNode, useContext, useState } from 'react';
import ToasterMessage from '../models/client-model/ToasterMessage';
import ToasterMessageItem from '../models/client-model/ToasterMessageItem';
import SystemUser from '../models/entities/SystemUser';
import Toaster from '../page/components/toaster';
import MessageDialog from '../page/modals/message-dialog';
import {
  clearSession,
  getSessionProfile,
  getToken,
} from '../repositories/session-managers';

const SetToasterMessageContext = React.createContext<
  (message: ToasterMessageItem) => void
>(() => {});
const ToasterMessageContext = React.createContext<
  [ToasterMessage[], React.Dispatch<React.SetStateAction<ToasterMessage[]>>]
>([[], () => {}]);
const AuthorizeContext = React.createContext<boolean>(false);
const UserProfileContext = React.createContext<SystemUser | undefined>(
  undefined
);
const SetMessageContext = React.createContext<(message: Message) => void>(
  () => {}
);
const SetCloseMessageDialogContext = React.createContext<() => void>(() => {});
const MessageContext = React.createContext<Message | undefined>(undefined);
const OpenMessageDialogContext = React.createContext<boolean>(false);
const UpdateAuthorizeContext = React.createContext<
  (authorize: boolean) => void
>(() => {});
const SetBusyContext = React.createContext<(args: boolean) => void>(() => {});
const UpdateUserProfileContext = React.createContext<
  (args: SystemUser | undefined) => void
>(() => {});
export interface Message {
  message: string;
  type?: MESSAGETYPE | undefined;
  action?: MESSAGEACTION | undefined;
  onOk?: () => void;
}
export type MESSAGETYPE = 'MESSAGE' | 'ALERT';
export type MESSAGEACTION = 'YESNO' | 'OKCANCEL';
export function useSetToasterMessage() {
  return useContext(SetToasterMessageContext);
}
export function useToasterMessage() {
  return useContext(ToasterMessageContext);
}
export function useSetCloseMessageDialog() {
  return useContext(SetCloseMessageDialogContext);
}
export function useAuthorize() {
  return useContext(AuthorizeContext);
}
export function useUserProfile() {
  return useContext(UserProfileContext);
}
export function useUpdateAuthorize() {
  return useContext(UpdateAuthorizeContext);
}
export function useSetMessage() {
  return useContext(SetMessageContext);
}
export function useMessage() {
  return useContext(MessageContext);
}
export function useOpenMessageDialog() {
  return useContext(OpenMessageDialogContext);
}
export function useSetBusy() {
  return useContext(SetBusyContext);
}
export function useUpdateUserProfile() {
  return useContext(UpdateUserProfileContext);
}
export function AuthorizeProvider({ children }: { children: ReactNode }) {
  const [toasterMessages, setToasterMessages] = useState<ToasterMessage[]>(
    () => []
  );
  const [authorize, setAuthorize] = useState(() => {
    const token = getToken();
    return token?.token !== undefined;
  });
  const [userProfile, setUserProfile] = useState<SystemUser | undefined>(() => {
    return getSessionProfile();
  });
  const [openMessageDialog, setOpenMessageDialog] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>();
  const [showLoading, setShowLoading] = useState<number>(() => 0);
  function updateProfile(profile: SystemUser | undefined) {
    setUserProfile(profile);
  }
  function updateAuthorize(authorize: boolean) {
    if (!authorize) {
      clearSession();
      setUserProfile(undefined);
    }
    setAuthorize(authorize);
  }
  function showMessage(message: Message) {
    setMessage(message);
    setOpenMessageDialog(true);
  }
  function closeMessageDilaog() {
    setOpenMessageDialog(false);
  }
  function setBusy(isBusy: boolean) {
    setShowLoading((b) => b + (isBusy ? 1 : -1));
    if (showLoading + (isBusy ? 1 : -1) === 1) {
      document.body.classList.add('body-loading');
    } else {
      document.body.classList.remove('body-loading');
    }
  }
  function showToaster(message: ToasterMessageItem) {
    if (message?.content === 'Unauthorized') updateAuthorize(false);
    setToasterMessages((r) => [
      ...r,
      {
        id: Guid.create(),
        content: message.content,
        title: message.title,
        idle: false,
        time: 3,
      },
    ]);
  }

  return (
    <div>
      <div
        className={
          'loading-screen' + (showLoading > 0 ? ' loading-block' : '')
        }>
        <div className='loading-blocker'></div>
        <div className='loading'>
          <div></div>
        </div>
      </div>
      <SetBusyContext.Provider value={setBusy}>
        <SetToasterMessageContext.Provider value={showToaster}>
          <OpenMessageDialogContext.Provider value={openMessageDialog}>
            <SetCloseMessageDialogContext.Provider value={closeMessageDilaog}>
              <MessageContext.Provider value={message}>
                <SetMessageContext.Provider value={showMessage}>
                  <AuthorizeContext.Provider value={authorize}>
                    <UpdateAuthorizeContext.Provider value={updateAuthorize}>
                      <UserProfileContext.Provider value={userProfile}>
                        <UpdateUserProfileContext.Provider
                          value={updateProfile}>
                          {children}
                          {openMessageDialog && <MessageDialog />}
                          <ToasterMessageContext.Provider
                            value={[toasterMessages, setToasterMessages]}>
                            <Toaster />
                          </ToasterMessageContext.Provider>
                        </UpdateUserProfileContext.Provider>
                      </UserProfileContext.Provider>
                    </UpdateAuthorizeContext.Provider>
                  </AuthorizeContext.Provider>
                </SetMessageContext.Provider>
              </MessageContext.Provider>
            </SetCloseMessageDialogContext.Provider>
          </OpenMessageDialogContext.Provider>
        </SetToasterMessageContext.Provider>
      </SetBusyContext.Provider>
    </div>
  );
}
