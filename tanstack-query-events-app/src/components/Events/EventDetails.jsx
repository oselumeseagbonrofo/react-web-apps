import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";

import Header from "../Header.jsx";
import { fetchEvent, deleteEvent, queryClient } from "../../util/http.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EventDetails() {
  // useParams Hook of reactRouter to get the ID of the event
  // make display, edit & delete work

  // Enable Navigation
  const navigate = useNavigate();

  // Get id paramter
  const { id } = useParams();

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmDelete) {
      mutate({ id });
    }
  };

  // Fetch data for the event
  const {
    data: event,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["events", id],
    queryFn: ({ signal }) => {
      return fetchEvent({ id, signal });
    },
  });

  // Mutate function to delete the event
  const { mutate, isPending: isDeleting, isError: isDeleteError, error:deleteError } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
        refetchType: "none",
      });
      navigate("/events");
    },
  });

  // Handle loading states and error display
  let content;

  if (isLoading) {
    content = (
      <div id="event-details-content" className="center">
        <LoadingIndicator />
        <p>Fetching event data</p>
      </div>
    );
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occured"
        message={error.info?.message || "Could not fetch event data"}
      />
    );
  }

  if (isDeleting){
    content = (
      <div id="event-details-content" className="center">
        <LoadingIndicator />
        <p>Deleting Data</p>
      </div>
    )
  }

  if (isDeleteError) {
    content = (
      <ErrorBlock
        title="An error occured"
        message={deleteError.info?.message || "Could not delete event"}
      />
    );
  }

  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      {content}
      {event && (
        <article id="event-details">
          <header>
            <h1>{event.title}</h1>
            <nav>
              <button onClick={handleDelete}>Delete</button>
              <Link to="edit">Edit</Link>
            </nav>
          </header>

          <div id="event-details-content">
            <img src={`http://localhost:3000/${event.image}`} alt="" />
            <div id="event-details-info">
              <div>
                <p id="event-details-location">{event.location}</p>
                <time dateTime={`${event.date}T${event.time}`}>
                  {new Date(event.date).toLocaleDateString("en-NG", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  @ {event.time}
                </time>
              </div>
              <p id="event-details-description">{event.description}</p>
            </div>
          </div>
        </article>
      )}
    </>
  );
}
