# Guilherme Challenge

Hello, hope you're fine. I created this document to explain some design decisions.

### Backend

-   The expiration and validation of the cache is all managed by pgsql. To do that, I've took liberty to add the pg_cron extension on the image, during the build script. This way, even if the API is down, the database will be able to check on the validity of the caching and remove it, if it is necessary.
-   I've applied a little of SOLID patterns, this is why we have two services. Thinking in scale, having a class with multiple methods make hard to maintain it, so I prefer to do always one class one method, one of the patterns of SOLID. Another pattern I've applied is creating an interface for the entities of the application. I am not against repeating code but they need to have a single source of truth, and that's where the interface comes in.
