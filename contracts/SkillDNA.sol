// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title SkillDNA
 * @dev Смарт-контракт для хранения и управления цифровой ДНК навыков
 */
contract SkillDNA is Ownable, ReentrancyGuard {
    
    // Структура для хранения данных навыков
    struct SkillData {
        string[] skills;
        string[] education;
        string[] characteristics;
        string[] personalInfo;
        string[] workExperience;
        string[] achievements;
        uint256 timestamp;
        bool isActive;
    }
    
    // Маппинг адрес -> данные навыков
    mapping(address => SkillData) public userSkills;
    
    // Маппинг для проверки существования пользователя
    mapping(address => bool) public hasSkillDNA;
    
    // События
    event SkillDNACreated(address indexed user, uint256 timestamp);
    event SkillDNAUpdated(address indexed user, uint256 timestamp);
    event SkillDNADeleted(address indexed user, uint256 timestamp);
    
    // Модификаторы
    modifier onlyWithSkillDNA() {
        require(hasSkillDNA[msg.sender], "User does not have SkillDNA");
        _;
    }
    
    modifier onlyValidData(
        string[] memory skills,
        string[] memory education,
        string[] memory characteristics,
        string[] memory personalInfo,
        string[] memory workExperience,
        string[] memory achievements
    ) {
        require(skills.length > 0 || education.length > 0 || characteristics.length > 0, 
                "At least one category must have data");
        _;
    }
    
    /**
     * @dev Создание или обновление SkillDNA
     * @param skills Массив навыков
     * @param education Массив образования
     * @param characteristics Массив характеристик
     * @param personalInfo Массив личной информации
     * @param workExperience Массив опыта работы
     * @param achievements Массив достижений
     */
    function createOrUpdateSkillDNA(
        string[] memory skills,
        string[] memory education,
        string[] memory characteristics,
        string[] memory personalInfo,
        string[] memory workExperience,
        string[] memory achievements
    ) external onlyValidData(skills, education, characteristics, personalInfo, workExperience, achievements) {
        
        // Сохраняем данные
        userSkills[msg.sender] = SkillData({
            skills: skills,
            education: education,
            characteristics: characteristics,
            personalInfo: personalInfo,
            workExperience: workExperience,
            achievements: achievements,
            timestamp: block.timestamp,
            isActive: true
        });
        
        hasSkillDNA[msg.sender] = true;
        
        // Эмитируем событие
        if (hasSkillDNA[msg.sender]) {
            emit SkillDNAUpdated(msg.sender, block.timestamp);
        } else {
            emit SkillDNACreated(msg.sender, block.timestamp);
        }
    }
    
    /**
     * @dev Получение данных пользователя
     * @param user Адрес пользователя
     * @return Структура с данными навыков
     */
    function getUserSkillDNA(address user) external view returns (SkillData memory) {
        require(hasSkillDNA[user], "User does not have SkillDNA");
        return userSkills[user];
    }
    
    /**
     * @dev Получение собственных данных
     * @return Структура с данными навыков
     */
    function getMySkillDNA() external view onlyWithSkillDNA returns (SkillData memory) {
        return userSkills[msg.sender];
    }
    
    /**
     * @dev Удаление SkillDNA
     */
    function deleteSkillDNA() external onlyWithSkillDNA {
        delete userSkills[msg.sender];
        hasSkillDNA[msg.sender] = false;
        
        emit SkillDNADeleted(msg.sender, block.timestamp);
    }
    
    /**
     * @dev Проверка существования SkillDNA
     * @param user Адрес пользователя
     * @return true если существует
     */
    function hasUserSkillDNA(address user) external view returns (bool) {
        return hasSkillDNA[user];
    }
    
    /**
     * @dev Получение количества пользователей с SkillDNA
     * @return Количество пользователей
     */
    function getTotalUsers() external view returns (uint256) {
        // В реальном контракте здесь была бы логика подсчета
        return 0; // Заглушка
    }
    
    /**
     * @dev Экстренная остановка контракта (только владелец)
     */
    function emergencyStop() external onlyOwner {
        // Логика экстренной остановки
    }
    
    /**
     * @dev Возобновление работы контракта (только владелец)
     */
    function resume() external onlyOwner {
        // Логика возобновления
    }
}
