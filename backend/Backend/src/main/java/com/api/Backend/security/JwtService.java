package com.api.Backend.security;

import com.api.Backend.core.models.UserModel;
import io.jsonwebtoken.Claims;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;

@Service
public class JwtService {

    private static String SECRET_KEY;

    @Value("${jwt.secret.key}")
    private void setSecretKey(String secretKey) {
        JwtService.SECRET_KEY = secretKey;
    }

    public String generateToken(UserDetails user) {
        return getToken(new HashMap<>(), user);
    }

    private String getToken(Map<String,Object> extraClaims, UserDetails user) {
        UUID userId = ((UserModel) user).getId();
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userId.toString())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+1000*60*24))
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Key getKey() {
        byte[] keyBytes=Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public UUID getUserIdFromToken(String token) {
        return UUID.fromString(getClaim(token, Claims::getSubject));
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final UUID  userId = getUserIdFromToken(token);
        return (userId.equals(((UserModel) userDetails).getId()) && !isTokenExpired(token));
    }

    private Claims getAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public <T> T getClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = getAllClaims(token);
        return claimResolver.apply(claims);
    }

    private Date getExpirationDateFromToken(String token) {
        return getClaim(token, Claims::getExpiration);
    }

    private boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

}