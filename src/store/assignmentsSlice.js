import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = { items: [] };

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    assignmentsLoaded(state, action) { state.items = action.payload; },
    assignmentAdded: {
      reducer(state, action) { state.items.unshift(action.payload); },
      prepare(assignment) { return { payload: { id: assignment.id ?? nanoid(), assignedAt: new Date().toISOString(), ...assignment } }; },
    },
    assignmentUpdated(state, action) {
      const index = state.items.findIndex((assignment) => assignment.id === action.payload.id);
      if (index !== -1) state.items[index] = { ...state.items[index], ...action.payload.changes };
    },
    assignmentRemoved(state, action) { state.items = state.items.filter((assignment) => assignment.id !== action.payload); },
    employeeAssignmentsCleared(state, action) { state.items = state.items.filter((assignment) => assignment.employeeId !== action.payload); },
  },
});

export const { assignmentsLoaded, assignmentAdded, assignmentUpdated, assignmentRemoved, employeeAssignmentsCleared } = assignmentsSlice.actions;
export const selectAssignments = (state) => state.assignments.items;
export const selectAssignmentsByEmployee = (state, employeeId) => state.assignments.items.filter((assignment) => assignment.employeeId === employeeId);
export default assignmentsSlice.reducer;