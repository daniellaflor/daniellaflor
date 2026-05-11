package com.projeto.ContaBanco.exceptio;

public class BusinessException extends RuntimeException {
    public BusinessException(String message) {
        super(message);
    }
}
