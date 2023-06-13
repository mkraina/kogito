type EventName = string;
type Callable = (payload: any | null) => void;

const events: Record<EventName, Callable[]> = {};

const addListener = (event: EventName, callback: Callable) => {
  if (!events[event]) {
    events[event] = [];
  }
  events[event].push(callback);
};

const removeListener = (callback: Callable) => {
  Object.keys(events).map(eventName => {
    for (let i = 0, l = events[eventName].length; i < l; i++) {
      if (callback === events[eventName][i]) {
        events[eventName].splice(i, 1);
      }
    }
  });
};

const fireEvent = (event: EventName, payload: any | null = null) => {
  if (events[event]) {
    events[event].forEach(callbacks => {
      callbacks(payload);
    });
  }
};

const useEventListener = () => {
  return {
    addListener,
    removeListener,
    fireEvent,
  };
};

export default useEventListener;
