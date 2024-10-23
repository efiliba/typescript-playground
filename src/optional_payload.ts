type LogInEvent = {
  type: 'LOG_IN';
  payload: {
    userId: number;
  };
};

type LogOutEvent = {
  type: 'LOG_OUT';
};

type ActionEvent = LogInEvent | LogOutEvent;

const sendEvent = (eventType: ActionEvent['type'], payload?: any) => {
  switch (eventType) {
    case 'LOG_IN':
      console.log(`Hi ${payload.userId}`);
      break;
    case 'LOG_OUT':
      console.log(`Bye ${payload.userId}`);
      break;
    default:
      throw new Error(`Unexpected eventType ${eventType}`);
  }
};

// Runtime errors:
//   accessing payload.userId
// sendEvent('LOG_IN');
// sendEvent('LOG_OUT', {userId: 'added payload to wrong type'});

// Check if args has a payload - after extracting the ActionEvent type
const sendEvent2 = <T extends ActionEvent['type']>(
  ...args: Extract<ActionEvent, {type: T}> extends {payload: infer P}
    ? [type: T, payload: P] // Named tuple - was [T, P]
    : [type: T]
) => {
  switch (args[0]) {
    case 'LOG_IN':
      console.log(`Hi ${(args[1] as LogInEvent['payload']).userId}`);
      break;
    case 'LOG_OUT':
      console.log('Bye');
      break;
    default:
      throw new Error(`Unexpected eventType ${args[0]}`);
  }
};

// sendEvent2('LOG_IN'); // Error: Expected 2 arguments, but got 1
// sendEvent2('LOG_OUT', {userId: 'added payload to wrong type'}); // Error

sendEvent2('LOG_IN', {userId: 123}); // was <"LOG_IN">(args_0: "LOG_IN", args_1: {userId: number;}) => void
sendEvent2('LOG_OUT');
