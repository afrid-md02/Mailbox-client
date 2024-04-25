import { createSlice } from "@reduxjs/toolkit";

const initialListState = {
    currEmail : null,
    inbox : [],
    deletedEmails : [],
    sentEmails :[]
}

const listdataSlice = createSlice({
    name : 'listdata',
    initialState : initialListState,
    reducers : {
        inboxAddEmail (state, action){
          const existingEmail = state.inbox.find((email) => email.id === action.payload.id);
          
          if(existingEmail){
          }
          else{
            const updatedEmails = [{...action.payload.mail, id : action.payload.id}, ...state.inbox];
            state.inbox = updatedEmails;
          }
        },
        inboxRemoveEmail (state, action){
          const updatedEmails = state.inbox.filter((email) => email.id !== action.payload.id);
          state.inbox = updatedEmails
        },
        inboxUpdateEmail (state, action){
          const existingEmail = state.inbox.findIndex((email) => email.id === action.payload.id);

          const updatedEmails = state.inbox;

          updatedEmails[existingEmail] = {...action.payload.mail, id : action.payload.id}

          state.inbox = updatedEmails;

        },
        addCurrEmail(state, action){
          state.currEmail = action.payload.email;
        }, 
        removeCurr(state){
          state.currEmail = null;
        },
        logoutHandler(state){
          state.currEmail = null;
          state.inbox = [];
          state.deletedEmails = [];
          state.sentEmails =[];
        },
        deletedEmail(state, action){
          const existingEmail = state.deletedEmails.find((email) => email.id === action.payload.id);
          
          if(existingEmail){
          }
          else{
            const updatedEmails = [{...action.payload.mail, id : action.payload.id}, ...state.deletedEmails];
            state.deletedEmails = updatedEmails;
          }
        },  
        removeDeletedEmail(state, action){
          const updatedEmails = state.deletedEmails.filter((email) => email.id !== action.payload.id);
          state.deletedEmails = updatedEmails
        },
        sentEmail(state, action){

          const existingEmail = state.sentEmails.find((email) => email.id === action.payload.id);
          
          if(existingEmail){
          }
          else{
            const updatedEmails = [{...action.payload.mail, id : action.payload.id}, ...state.sentEmails];
            state.sentEmails = updatedEmails;
          }
        },    
        removeSentEmail(state, action){
          const updatedEmails = state.sentEmails.filter((email) => email.id !== action.payload.id);
          state.sentEmails = updatedEmails
        },
    }
})


export const listdataActions = listdataSlice.actions;
export default listdataSlice.reducer;