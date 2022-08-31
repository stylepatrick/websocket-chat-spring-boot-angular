package com.stylepatrick.chatapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.messaging.MessageSecurityMetadataSourceRegistry;
import org.springframework.security.config.annotation.web.socket.AbstractSecurityWebSocketMessageBrokerConfigurer;

@Configuration
public class WebSocketSecurity
        extends AbstractSecurityWebSocketMessageBrokerConfigurer {

    /*
    Without security config class all endpoints are secured.
    Same auth header used as build by http://localhost:8080/chat
    Nor required here because all endpoints are secured but used as an example
     */

    @Override
    protected void configureInbound(
            MessageSecurityMetadataSourceRegistry messages) {
        messages
                .simpSubscribeDestMatchers("/secured/topic/**").authenticated()
                .simpSubscribeDestMatchers("/secured/app/**").authenticated();
    }

    @Override
    protected boolean sameOriginDisabled() {
        return true;
    }
}