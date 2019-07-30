# Drone Teams


## Usage

Follow [Setting up a custom incoming webhook](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/connectors/connectors-using#setting-up-a-custom-incoming-webhook)

Define teams_webhook secret with the webhook URL in drone.

Add to .drone.yml

```yaml
steps:
- name: notify
  image: rabrennie/drone-teams
  settings:
    webhook:
      from_secret: teams_webhook
  when:
    status:
    - success
    - failure
```