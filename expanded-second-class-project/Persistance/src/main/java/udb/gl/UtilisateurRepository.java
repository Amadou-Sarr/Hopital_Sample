package udb.gl;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UtilisateurRepository extends JpaRepository <Utilisateur,Long> {

    Optional<Utilisateur> findById(Long id);
    //Optional<Utilisateur> updatePasswordWhereId(String password,long id);
    Optional<Utilisateur>  findByEmail(String email);
    Optional<Utilisateur> findByUsernameOrEmail(String username , String email);
    Optional<Utilisateur> findByUsername(String username);

    List<Utilisateur> findByIdIn(List<Long> userIds);

    Boolean existsByEmail(String email);
    Boolean existsByUsername(String username);




}
