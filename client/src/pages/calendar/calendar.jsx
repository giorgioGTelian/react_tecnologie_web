import { useState } from "react";
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

    const handleDateClick = (selected) => {
        const title = prompt("Inserisci il titolo dell'evento");
        const location = prompt("Inserisci la location dell'evento");
        const isAllDay = window.confirm("È un evento che dura tutto il giorno?");
        const repeatFrequency = prompt(
        "Inserisci la frequenza di ripetizione (nessuna, giornaliera, settimanale, mensile):",
        "nessuna"
        );
        const rruleFreq = mapFrequency(repeatFrequency); // Mappa la frequenza
        const repeatUntil = rruleFreq ? prompt("Inserisci la data di fine ripetizione (formato YYYY-MM-DD)") : null;

        const calendarApi = selected.view.calendar;
        calendarApi.unselect();

        if (title) {
        const newEvent = {
            id: `${selected.dateStr}-${title}`,
            title,
            start: selected.startStr,
            end: selected.endStr,
            allDay: isAllDay,
            location,
            rrule: rruleFreq
            ? {
                freq: rruleFreq, // Usa la frequenza mappata
                until: repeatUntil,
            }
            : null,
        };

        calendarApi.addEvent(newEvent);
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

    return (
        <Box m="20px">
        <h1>Calendar</h1>

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
                    rrulePlugin, // Plugin per gestire le ricorrenze
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
                eventsSet={(events) => setCurrentEvents(events)}
                initialEvents={[
                {
                    id: "12315",
                    title: "Evento giornaliero",
                    start: "2024-09-14",
                    allDay: true,
                    rrule: {
                    freq: "DAILY",
                    until: "2024-09-20",
                    },
                    extendedProps: {
                    location: "Office",
                    },
                },
                {
                    id: "5123",
                    title: "Evento settimanale",
                    start: "2024-09-28T10:00:00",
                    rrule: {
                    freq: "WEEKLY",
                    until: "2024-11-30",
                    },
                    extendedProps: {
                    location: "Online",
                    },
                },
                ]}
            />
            </Box>
        </Box>
        </Box>
    );
};

export default Calendar;
