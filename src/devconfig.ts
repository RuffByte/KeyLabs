type DevConfigType = {
  PAGE_TRANSITION: boolean;
  VERSION: string;
  DEBUG_QUERY: boolean;
};

if (process.env.ENVIRONMENT === 'DEVELOPMENT') {
  console.log('CURRENTLY RUNNING DEVELOPMENT MODE');
}

export const devConfig: DevConfigType =
  process.env.ENVIRONMENT === 'DEVELOPMENT'
    ? {
        PAGE_TRANSITION: true,
        VERSION: '0.0.0',
        DEBUG_QUERY: true,
      }
    : {
        PAGE_TRANSITION: true,
        VERSION: '0.0.0',
        DEBUG_QUERY: false,
      };
