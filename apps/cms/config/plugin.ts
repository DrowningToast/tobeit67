export default {
  //
  graphql: {
    config: {
      endpoint: "/graphql",
      shadowCRUD: true,
      playgroundAlways: false,
      depthLimit: 7,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
  },
  io: {
    enabled: true,
    config: {
      IOServerOptions: {
        cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
      },
      contentTypes: {
        reservation: "*",
      },
      events: [
        {
          name: "connection",
          handler: ({ strapi }, socket) => {
            strapi.log.info(`[io] new connection with id ${socket.id}`);
          },
        },
      ],
    },
  },
};
