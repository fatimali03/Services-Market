import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./UserSlice";
import companySlice from "./CompanySlice";
import clientSlice from "./ClientSlice";
import chatSlice from "./ChatSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    company: companySlice,
    client: clientSlice,
    chat: chatSlice,
  },
});
