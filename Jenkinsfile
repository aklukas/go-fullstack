pipeline {
  agent any
  stages {
    stage('Install') {
      steps {
        sh "cd client && yarn"
      }
    }
    stage('Lint') {
      steps {
        sh "cd client && yarn lint"
      }
    }
  }
}
