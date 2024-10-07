const colours = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',

  fg: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    gray: '\x1b[90m',
    crimson: '\x1b[38m',
  },
  bg: {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m',
    gray: '\x1b[100m',
    crimson: '\x1b[48m',
  },
};

if (process.env.NODE_ENV === 'development') {
  console.log(
    `${colours.bg.green}\n`,
    '\n',
    'CURRENTLY RUNNING IN DEVELOPMENT MODE',
    '\n',
    '\n',
    colours.reset
  );
}

type DevConfigType = {
  PAGE_TRANSITION: boolean;
  VERSION: string;
  DEBUG_QUERY: boolean;
  DEBUG_MENU: boolean;
  DEBUG_FUNCTION: boolean;
  DISABLE_NOTFOUND: boolean;
  ENABLE_DEBUG_GAMEMODE_OPTION: boolean;
};

const isdev = process.env.NODE_ENV === 'development';

export const devConfig: DevConfigType = {
  VERSION: '0.0.0',
  PAGE_TRANSITION: isdev ? true : true,
  DEBUG_QUERY: isdev ? true : false,
  DEBUG_MENU: isdev ? true : false,
  DEBUG_FUNCTION: isdev ? false : false,
  DISABLE_NOTFOUND: isdev ? false : true,
  ENABLE_DEBUG_GAMEMODE_OPTION: isdev ? true : false,
};
