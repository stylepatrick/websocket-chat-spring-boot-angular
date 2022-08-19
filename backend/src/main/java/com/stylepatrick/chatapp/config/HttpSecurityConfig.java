package com.stylepatrick.chatapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class HttpSecurityConfig extends WebSecurityConfigurerAdapter {

    /*
    Without security config class all endpoints are secured.
    Nor required here because all endpoints are secured but used as an example
     */

    @Override
    protected void configure(HttpSecurity http)
            throws Exception {
        http
                .cors()
                .and()
                .httpBasic()
                .and()
                .csrf().disable()
                .headers()
                .frameOptions().disable()
                .cacheControl().disable()
                .and()
                .antMatcher("/**")
                .authorizeRequests()
                .antMatchers("/**")
                .authenticated();
    }
}
