package com.pedroalmeida.gamebuddy.game;

import com.pedroalmeida.gamebuddy.appuser.AppUser;
import com.pedroalmeida.gamebuddy.gameType.GameType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashSet;
import java.util.List;

@Entity
@Setter
@Getter
@EntityListeners(AuditListener.class)
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer gameId;

    @Column
    private GameType gameType;

    @Column
    private String location;

    @Column
    private LocalDateTime gameDateTime;

    @Column
    private boolean isFull;

    @Column
    private int numPlayers;

    @ManyToMany
    @JoinColumn(name = "user_id")
    private List<AppUser> participants;

    @Column
    private HashSet<String> favorites;

    @Column
    private String author;

    @Column
    private String createdBy;

    @Column
    private String updatedBy;

    @Version
    @Column
    private int version;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created")
    private Date created;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated")
    private Date updated;
}