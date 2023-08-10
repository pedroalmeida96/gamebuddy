package com.pedroalmeida.gamebuddy.appuser;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class AppUserDTO {
    private String userId;
    private String name;
}