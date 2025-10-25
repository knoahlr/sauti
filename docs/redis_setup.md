# Redis Setup (Development)

## Install

- `sudo apt-get update`
- `sudo apt-get install redis-server`

## Configure for local use

- Bind Redis to loopback: `sudo sed -i 's/^#*\s*bind .*/bind 127.0.0.1/' /etc/redis/redis.conf`
- Confirm port 6379: `sudo sed -i 's/^port .*/port 6379/' /etc/redis/redis.conf`
- Let systemd supervise the service: `sudo sed -i 's/^supervised .*/supervised systemd/' /etc/redis/redis.conf`

## Start & verify

- Restart and enable: `sudo systemctl restart redis-server && sudo systemctl enable redis-server`
- Check status: `sudo systemctl status redis-server`
- Ping locally: `redis-cli -h 127.0.0.1 -p 6379 ping` (returns `PONG` when ready)

Redis now listens on `127.0.0.1:6379`, matching the default Rails configuration. Keep the service running while developing so Sidekiq, caching, and streaming features operate correctly.
