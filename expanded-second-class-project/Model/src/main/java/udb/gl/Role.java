package udb.gl;

import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Role {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Enumerated(EnumType.STRING)
    @NaturalId
    @Column(length = 50)
    private RoleName name;


    public Role(RoleName name) {
        this.name = name;
    }

    public Role () {}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public RoleName getName() {
        return name;
    }

    public void setName(RoleName name) {
        this.name = name;
    }


}
