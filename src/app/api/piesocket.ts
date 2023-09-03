const PieSocket = require("piesocket-nodejs");

import type { NextApiRequest, NextApiResponse } from 'next'
type ResponseData = {
  message: object
}
export const pieSocket = new PieSocket({
    clusterId: process.env.NEXT_PUBLIC_PIE_SOCKET_CLUSTER_ID,
    apiKey: process.env.NEXT_PUBLIC_PIE_SOCKET_API_KEY ,
    notifySelf: true,
    secret: process.env.NEXT_PUBLIC_PIE_SOCKET_SECRET,
  });




  export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
  ) {
    if (req.method === 'POST') {
      try {
        // Replace 'yourChannelName' and '{ some: 'data' }' with your desired channel name and data
        var channelName = req.body.channelName;
          var data = req.body.data;
          console.log(channelName);
          
        const channel = await pieSocket.publish(channelName, data);
        res.status(200).json(data);
        return channel;
      } catch (error) {
        res.status(500).json(data);
      }
    } else {
      res.status(405).json(data);
    }
  }

  export const publishToChannel = async (channelName:string, data:any) => {

    try {
      const channel = await pieSocket.publish(channelName, data);
      console.log('Published to channel:', channelName);
      return channel;
    } catch (error) {
      console.error('Error publishing to channel:', error);
      throw error;
    }
  }
