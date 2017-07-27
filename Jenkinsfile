pipeline {
  agent any
  stages {
    stage('bbbbb') {
      steps {
        echo 'hello'
      }
    }
    stage('ccccc') {
      steps {
        echo 'bbb'
        timeout(time: 1) {
          sleep 10
        }
        
      }
    }
  }
  environment {
    bb = 'bbb'
  }
}