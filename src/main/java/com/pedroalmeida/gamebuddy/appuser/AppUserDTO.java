package com.pedroalmeida.gamebuddy.appuser;

import lombok.*;

@Builder
@Getter
public class AppUserDTO {
    private String userId;
    private String name;
}