package com.pedroalmeida.gamebuddy.appuser;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class AppUserDTO {
    private Integer userId;
    private String name;
    private String username;
}