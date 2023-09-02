//  @ts-ignore
import PieSocket from 'piesocket-js';

export const pieSocket = new PieSocket({
    clusterId: process.env.NEXT_PUBLIC_PIE_SOCKET_CLUSTER_ID,
    apiKey: process.env.NEXT_PUBLIC_PIE_SOCKET_API_KEY ,
    notifySelf: true,
  });


export const subscribeToChannel = async (channelName:string) => {
    try {
      const channel = await pieSocket.subscribe(channelName);
      console.log('Subscribed to channel:', channelName);
      return channel;
    } catch (error) {
      console.error('Error subscribing to channel:', error);
      throw error;
    }
  };

