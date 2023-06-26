import ical from 'ical';

export function extractEventsFromICS(icsData, userId) {
    const events = ical.parseICS(icsData);
    const extractedEvents = [];
  
    for (let key in events) {
      if (events.hasOwnProperty(key)) {
        const event = events[key];
  
        if (event.type === 'VEVENT') {
          extractedEvents.push({
            title: event.summary,
            start: event.start,
            end: event.end,
            userOwner: userId, // Füge das userOwner-Feld hinzu
          });
        }
      }
    }
  
    return extractedEvents;
  }
  