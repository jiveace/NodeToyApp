Steps Required To Deploy This To Kubernetes
1) Enable GKE
2) git clone https://github.com/jiveace/NodeToyApp.git
2a) Ensure everything works with 'node server.js'
3) docker image build -t dance/dance-web:0.1 .
   docker tag dance/dance-web:0.1 eu.gcr.io/<project-id>/dance
   docker image push eu.gcr.io/<project-id>/dance:latest
4) https://console.cloud.google.com/gcr/images/<project-id>?project=<project-id>
5) Create FREE cluster
6) Connect to cluster 
   * gcloud container clusters get-credentials dance-cluster --zone us-central1-a --project <project-id> 
7) Update image referred to in web-deploy.yml
   kubectl apply -f web-deploy.yml
   kubectl apply -f web-sl.yml
