// vim: filetype=groovy
node('general') {
    def base = load '/var/jenkins_home/workspace/Infra/build-scripts/build/Jenkinsfile'
    creds = base.get_decrypt_creds() + base.get_app_creds('engineering-dojo')
    base.execute([
        credentials: creds,
        distImages: ['engineering_dojo']
    ])
}
