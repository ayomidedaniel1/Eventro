import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
);

const TICKETMASTER_API_KEY = process.env.TICKETMASTER_API_KEY;

async function seedEvents () {
  const response = await fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TICKETMASTER_API_KEY}&size=10&countryCode=US`
  );

  const json = await response.json();
  const events = json._embedded?.events || [];

  const formattedEvents = events.map(event => ({
    title: event.name,
    date: event.dates.start.localDate,
    time: event.dates.start.localTime,
    image: event.images?.[0]?.url || '',
    venue: event._embedded?.venues?.[0]?.name || '',
    location: event._embedded?.venues?.[0]?.city?.name || '',
    external_url: event.url,
  }));

  const { data, error } = await supabase
    .from('events')
    .insert(formattedEvents);

  if (error) {
    console.error('Insert error:', error.message);
  } else {
    console.log('Seeded events:', data.length);
  }
}

seedEvents();
