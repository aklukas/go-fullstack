pipeline {
  agent {
    docker {
          image "node:6.3"
        }
      }
  stages {
    stage('Build Images') {
      steps {
        sh "bash start.sh"
      }
    }
  }
}
