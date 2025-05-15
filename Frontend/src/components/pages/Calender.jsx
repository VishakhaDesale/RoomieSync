import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewMonthAgenda,
  createViewMonthGrid,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import "@schedule-x/theme-default/dist/index.css";
import { useEffect, useState } from "react";
import "./Calender.css";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";

import axios from 'axios';

function Calender() {
  const eventsService = useState(() => createEventsServicePlugin())[0];

  const [events, setEvents] = useState([]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);

  // Fetch 
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/calender/api/events'); 
        setEvents(response.data); 
        eventsService.set(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
  
    fetchEvents();

    const interval = setInterval(fetchEvents, 3000);

    return () => clearInterval(interval);
  }, [eventsService]);
  

  // Track changes 
  useEffect(() => {
    console.log("Updated events:", events);
    eventsService.set(events);
  }, [events, eventsService]);

  // add or edit an event
  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    if (isEditing) {
      // Update the existing event
      try {
        await axios.put(`http://localhost:8080/calender/api/events/${editingEventId}`, newEvent); 
        setEvents(
          events.map((event) =>
            event.id === editingEventId ? { ...newEvent, id: editingEventId } : event
          )
        );
        setIsEditing(false);
        setEditingEventId(null);
      } catch (error) {
        console.error("Error updating event:", error);
      }
    } else {
      // Create a new event
      try {
        const response = await axios.post('http://localhost:8080/calender/api/events', newEvent); // POST request to create new event
        const createdEvent = response.data;
        setEvents([...events, createdEvent]);
      } catch (error) {
        console.error("Error creating event:", error);
      }
    }
  
    setNewEvent({ title: "", description: "", start: "", end: "" });
  };
  

  // Handle delete event
  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:8080/calender/api/events/${eventId}`); // DELETE request to remove event
      setEvents(events.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };
  

  // Handle edit event
  const handleEditEvent = (eventId) => {
    const eventToEdit = events.find((event) => event.id === eventId);
    setNewEvent(eventToEdit);
    setIsEditing(true);
    setEditingEventId(eventId);
  };

  // Calendar setup
  const calendar = useCalendarApp({
    views: [
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: events,
    plugins: [
      eventsService,
      createEventModalPlugin(),
      createDragAndDropPlugin(),
    ],
  });

  return (
    <div className="p-[10rem] flex flex-col justify-center">
      <h1 className="text-center font-bold text-4xl py-4">
        Seamless Event Planning
      </h1>
      <div className="flex">
        {/* Calendar component */}
        <ScheduleXCalendar calendarApp={calendar} />

        {/* Event form */}
        <div className="event-form mt-4 p-4 rounded-md ml-2 border-2 h-fit">
          <h2>{isEditing ? "Edit Event" : "Add New Event"}</h2>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                required
                className="form-input"
              />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
                className="form-input"
              />
            </div>
            <div>
              <label>Start Time:</label>
              <input
                type="datetime-local"
                value={newEvent.start}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, start: e.target.value })
                }
                required
                className="form-input"
              />
            </div>
            <div>
              <label>End Time:</label>
              <input
                type="datetime-local"
                value={newEvent.end}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, end: e.target.value })
                }
                required
                className="form-input"
              />
            </div>
            <button
              type="submit"
              className="mt-2 bg-blue-500 text-white p-2 rounded"
            >
              {isEditing ? "Update Event" : "Add Event"}
            </button>
          </form>
        </div>
      </div>

      {/* List of events with Edit and Delete options */}
      <div className="mt-4">
        <h2>Event List</h2>
        <ul>
          {events.map((event) => (
            <li key={event.id} className="mb-2 border-2 p-2 rounded-lg w-fit">
              <strong>{event.title}</strong> - {event.description} (From:{" "}
              {event.start} To: {event.end})
              <div>
                <button
                  onClick={() => handleEditEvent(event.id)}
                  className="ml-4 bg-yellow-400 text-black p-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="ml-2 bg-red-500 text-white p-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Calender;
