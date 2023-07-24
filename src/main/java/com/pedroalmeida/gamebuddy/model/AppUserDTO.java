package com.pedroalmeida.gamebuddy.model;

import lombok.*;

@Builder
@Getter
public class AppUserDTO {
    private String userId;
    private String name;
}