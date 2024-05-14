import { IRequest } from "@/lib/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import { requestsService } from "../../services/requests/requestsService";

export interface IRequests {
  received: IRequest[];
  sent: IRequest[];
}

const initialState: IRequests = {
  sent: [],
  received: [],
};

// Methods
const setSentRequestsMethod = (
  state: IRequests,
  action: { payload: IRequest[] }
) => {
  state.sent = [...state.sent, ...action.payload];

  return state;
};

const filterSentRequestsMethod = (
  state: IRequests,
  action: { payload: string }
) => {
  state.sent = state.sent.filter((item) => item._id !== action.payload);

  return state;
};

const setReceivedRequestsMethod = (
  state: IRequests,
  action: { payload: IRequest[] }
) => {
  state.received = action.payload;

  return state;
};

export const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    setSentRequests: setSentRequestsMethod,
    setReceivedRequests: setReceivedRequestsMethod,
    filterSentRequests: filterSentRequestsMethod,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      requestsService.endpoints.getSentRequests.matchFulfilled,
      (state, action) => {
        const newData = action.payload?.data || [];

        state.sent = [...state.sent, ...newData];
      }
    );
    builder.addMatcher(
      requestsService.endpoints.getReceivedRequests.matchFulfilled,
      (state, action) => {
        state.received = action.payload?.data || [];
      }
    );
    builder.addMatcher(
      requestsService.endpoints.cancelSentRequest.matchFulfilled,
      (state, action) => {
        const id = action.payload.data;

        state.sent = state.sent.filter((item) => item._id !== id);

        return state;
      }
    );
  },
});

export const selectSentRequests = (state: { requests: IRequests }) =>
  state.requests.sent;
export const selectReceivedRequests = (state: { requests: IRequests }) =>
  state.requests.received;

export const { setSentRequests, setReceivedRequests, filterSentRequests } =
  requestsSlice.actions;
