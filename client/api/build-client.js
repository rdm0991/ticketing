import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // We are on the server

    return axios.create({
      baseURL: 'http://ingress-nginx.kube-system.svc.cluster.local',
      //baseURL: `${req['x-forwarded-proto']}://${req.headers.host}`,
      headers: req.headers,
    });
  } else {
    // We must be on the browser
    return axios.create({
      baseUrl: '/',
    });
  }
};
