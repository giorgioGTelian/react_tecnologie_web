import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import rrulePlugin from "@fullcalendar/rrule"; // Importa il plugin per le ricorrenze
import itLocale from '@fullcalendar/core/locales/it'; // Importa l'interfaccia per la localizzazione
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Typography,
    } from "@mui/material";
import axios from "axios";


    const Calendar = () => {
    const [currentEvents, setCurrentEvents] = useState([]);
    // Mappa le frequenze inserite dall'utente ai valori supportati da rrule
    const mapFrequency = (frequency) => {
        switch (frequency.toLowerCase()) {
        case "giornaliera":
            return "DAILY";
        case "settimanale":
            return "WEEKLY";
        case "mensile":
            return "MONTHLY";
        case "annuale":
            return "YEARLY";
        default:
            return null;
        }
    };

    
const handleDateClick = async (selected) => {
    const title = prompt("Inserisci il titolo dell'evento");
    const location = prompt("Inserisci la location dell'evento");
    const isAllDay = window.confirm("È un evento che dura tutto il giorno?");
    const repeatFrequency = prompt("Inserisci la frequenza di ripetizione (nessuna, giornaliera, settimanale, mensile):", "nessuna");
    const rruleFreq = mapFrequency(repeatFrequency);
    const repeatUntil = rruleFreq ? prompt("Inserisci la data di fine ripetizione (formato YYYY-MM-DD)") : null;

    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
        const newEvent = {
            title,
            start: selected.startStr,
            end: selected.endStr,
            allDay: isAllDay,
            location,
            rrule: rruleFreq
                ? {
                    freq: rruleFreq,
                    until: repeatUntil,
                }
                : null,
        };

        try {
            const token = localStorage.getItem('token'); // Get the token from localStorage
            const response = await axios.post('http://localhost:9000/save-event', newEvent, {
                headers: {
                    'Authorization': `Bearer ${token}` // Include token in headers
                }
            });
            console.log("Evento salvato con successo", response.data);
            calendarApi.addEvent({
                id: `${selected.dateStr}-${title}`,
                ...newEvent,
            });
        } catch (error) {
            console.error("Errore nel salvataggio dell'evento", error);
        }
    }
};
    

    const handleEventClick = (selected) => {
        if (
        window.confirm(
            `Vuoi cancellare l'evento '${selected.event.title}'?`
        )
        ) {
        selected.event.remove();
        }
    };

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
                const response = await axios.get('http://localhost:9000/get-events', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Include the token in the request header
                    }
                });
                setCurrentEvents(response.data.events);
            } catch (error) {
                console.error("Errore durante il recupero degli eventi", error);
            }
        };
    
        fetchEvents();
    }, []);
    

    return (
        <Box m="20px">
        <Typography variant="h3">Calendario</Typography>

        <Box display="flex" justifyContent="space-between">
            {/* CALENDAR SIDEBAR */}
            <Box flex="1 1 20%" p="15px" borderRadius="4px">
            <Typography variant="h5">Eventi recenti</Typography>
            <List>
                {currentEvents.slice(0, 4).map((event) => (
                <ListItem
                    key={event.id}
                    sx={{
                    margin: "10px 0",
                    borderRadius: "2px",
                    }}
                >
                    <ListItemText
                    primary={event.title}
                    secondary={
                        <>
                        <Typography>
                            {formatDate(event.start, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            })}
                        </Typography>
                        <Typography>{event.extendedProps?.location}</Typography>
                        </>
                    }
                    />
                </ListItem>
                ))}
            </List>
            </Box>

            {/* CALENDAR */}
            <Box flex="1 1 100%" ml="15px">
            <FullCalendar
                locale={itLocale}
                height="75vh"
                plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                    listPlugin,
                    rrulePlugin,
                ]}
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                }}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                select={handleDateClick}
                eventClick={handleEventClick}
                eventsSet={(events) => {
                    // Avoid updating state if the events haven't changed
                    if (events.length !== currentEvents.length) {
                        setCurrentEvents(events);
                    }
                }}
                events={currentEvents} // Use the fetched events here
                />
            </Box>
        </Box>
        </Box>
    );
};

export default Calendar;