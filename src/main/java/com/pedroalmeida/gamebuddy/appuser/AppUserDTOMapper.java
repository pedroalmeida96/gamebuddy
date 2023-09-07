package com.pedroalmeida.gamebuddy.appuser;

import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class AppUserDTOMapper implements Function<AppUser, AppUserDTO> {
    @Override
    public AppUserDTO apply(AppUser appUser) {
        return AppUserDTO.builder().userId(appUser.getUserId()).name(appUser.getName()).username(appUser.getUsername()).build();
    }
}